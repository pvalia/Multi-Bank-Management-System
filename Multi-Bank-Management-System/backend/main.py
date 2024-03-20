# Run this file from Multi-Bank-Management-System folder with command uvicorn backend.main:app --reload
from datetime import date
from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from backend import models, schemas, database
from .database import Base, engine

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "FastAPI Server Starting"}


app = FastAPI()
Base.metadata.create_all(bind=engine)

def get_db():
    dbSession = database.SessionLocal()
    try:
        yield dbSession
    finally:
        dbSession.close()

#Takes in a branch input which should follow schema BankBranchCreate
#dbSession is a new database session to handle database operations
@app.post("/branches/", response_model=schemas.BankBranchCreate, status_code=status.HTTP_201_CREATED)
def create_branch(branch: schemas.BankBranchCreate, dbSession: Session = Depends(get_db)):
    db_branch = models.BankBranch(**branch.model_dump())
    dbSession.add(db_branch)
    dbSession.commit()
    dbSession.refresh(db_branch)
    return db_branch

@app.post("/employees/", response_model=schemas.EmployeeCreate, status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.EmployeeCreate, dbSession: Session = Depends(get_db)):
    db_employee = models.Employee(**employee.model_dump())
    dbSession.add(db_employee)
    dbSession.commit()
    dbSession.refresh(db_employee)
    return db_employee

@app.patch("/branches/{branch_id}", response_model=schemas.BankBranchCreate)
def update_branch(branch_id: int, branch_update: schemas.BankBranchUpdate, dbSession: Session = Depends(get_db)):
    db_branch = dbSession.query(models.BankBranch).filter(models.BankBranch.id == branch_id).first()
    if db_branch is None:
        raise HTTPException(status_code=404, detail="Bank branch not found")

    update_data = branch_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_branch, key, value)

    dbSession.commit()
    dbSession.refresh(db_branch)
    return db_branch

@app.post("/transactions/", status_code=status.HTTP_201_CREATED)
def create_transaction(transaction: schemas.TransactionCreate, dbSession: Session = Depends(get_db)):
    db_transaction = models.Transaction(**transaction.dict())
    dbSession.add(db_transaction)
    dbSession.commit()
    dbSession.refresh(db_transaction)
    return db_transaction

@app.get("/branches/{branch_id}/minimum_cash_requirement")
def calculate_minimum_cash_requirement(branch_id: int, week_start: date, week_end: date, dbSession: Session = Depends(get_db)):
    withdrawals = dbSession.query(func.sum(models.Transaction.amount)).filter(
        and_(
            models.Transaction.branch_id == branch_id,
            models.Transaction.transaction_type == 'withdrawal',
            models.Transaction.date >= week_start,
            models.Transaction.date <= week_end
        )
    ).scalar() or 0

    deposits = dbSession.query(func.sum(models.Transaction.amount)).filter(
        and_(
            models.Transaction.branch_id == branch_id,
            models.Transaction.transaction_type == 'deposit',
            models.Transaction.date >= week_start,
            models.Transaction.date <= week_end
        )
    ).scalar() or 0

    net_cash_outflow = withdrawals - deposits
    buffer = net_cash_outflow * 0.25
    minimum_cash_requirement = net_cash_outflow + buffer
    
    return {"minimum_cash_requirement": minimum_cash_requirement}