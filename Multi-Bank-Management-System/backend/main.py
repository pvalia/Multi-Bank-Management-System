# Run this file from Multi-Bank-Management-System folder with command uvicorn backend.main:app --reload
from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from backend import models, schemas, database
from .models import Employee
from .database import Base, engine
from typing import List
from sqlalchemy.orm import joinedload
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.get("/")
async def root():
    return {"message": "FastAPI Server Starting"}

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    dbSession = database.SessionLocal()
    try:
        yield dbSession
    finally:
        dbSession.close()

def load_balance_employees(db: Session, traffic_per_employee: int):
    branches = db.query(models.BankBranch).all()
    for branch in branches:
        branch.unaccounted_traffic = branch.avg_daily_traffic 

    unassigned_employees = db.query(models.Employee).filter(models.Employee.branch_id == None).all()

    while unassigned_employees and any(branch.unaccounted_traffic > 0 for branch in branches):
        branches.sort(key=lambda x: x.unaccounted_traffic, reverse=True)
        current_branch = branches[0]
        
        if current_branch.unaccounted_traffic > 0:
            employee = unassigned_employees.pop(0) 
            employee.branch_id = current_branch.id
            current_branch.unaccounted_traffic -= traffic_per_employee
            db.add(employee)
        else:
            break 

    db.commit()

#Takes in a branch input which should follow schema BankBranchCreate
#dbSession is a new database session to handle database operations
@app.post("/create-branch/", response_model=schemas.BankBranch, status_code=status.HTTP_201_CREATED)
def create_branch(branch: schemas.BankBranch, dbSession: Session = Depends(get_db)):
    branch_data = branch.dict()
    logger.debug(f"Received branch data for creation: {branch_data}")
    
    net_cash_flow = branch.avg_daily_withdrawal - branch.avg_daily_deposit
    buffer = net_cash_flow * 0.25  
    minimum_cash_requirement = net_cash_flow + buffer
    
    branch_data['minimum_cash_requirement'] = minimum_cash_requirement

    db_branch = models.BankBranch(**branch_data)
    dbSession.add(db_branch)
    dbSession.commit()
    dbSession.refresh(db_branch)
    
    return db_branch

@app.post("/employees/", response_model=schemas.Employee, status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.Employee, dbSession: Session = Depends(get_db)):
    db_employee = models.Employee(**employee.model_dump())
    dbSession.add(db_employee)
    dbSession.commit()
    dbSession.refresh(db_employee)
    return db_employee

@app.patch("/branches/{branch_id}", response_model=schemas.BankBranch)
def update_branch(branch_id: int, branch_update: schemas.BankBranchUpdate, dbSession: Session = Depends(get_db)):
    db_branch = dbSession.query(models.BankBranch).filter(models.BankBranch.id == branch_id).first()
    update_data = branch_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_branch, key, value)
    dbSession.commit()
    dbSession.refresh(db_branch)
    return db_branch

@app.get("/branches/", response_model=List[schemas.BankBranch])
def read_branches(db: Session = Depends(get_db)):
    branches = db.query(models.BankBranch).options(joinedload(models.BankBranch.employees)).all()
    for branch in branches:
        net_cash_flow = branch.avg_daily_withdrawal - branch.avg_daily_deposit
        buffer = net_cash_flow * 0.25 
        minimum_cash_requirement = net_cash_flow + buffer
        
        branch.net_cash_flow = net_cash_flow
        branch.buffer = buffer
        branch.minimum_cash_requirement = minimum_cash_requirement
    return branches

@app.get("/branches/{branch_id}", response_model=schemas.BankBranch)
def read_branch(branch_id: int, db: Session = Depends(get_db)):
    branch = db.query(models.BankBranch).options(joinedload(models.BankBranch.employees)).filter(models.BankBranch.id == branch_id).first()
    return branch

@app.post("/assign-employees/")
def assign_employees(db: Session = Depends(get_db), traffic_per_employee: int = 100):
    db.query(Employee).update({Employee.branch_id: None}, synchronize_session=False)
    db.commit()
    load_balance_employees(db, traffic_per_employee)

@app.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted successfully"}

@app.delete("/branches/{branch_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_branch(branch_id: int, db: Session = Depends(get_db)):
    db_branch = db.query(models.BankBranch).filter(models.BankBranch.id == branch_id).first()
    db.delete(db_branch)
    db.commit()
    return {"message": "Branch deleted successfully"}