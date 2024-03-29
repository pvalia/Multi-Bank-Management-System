from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from pydantic import BaseModel, Field
from typing import Optional

class BankBranch(Base):
    __tablename__ = 'bank_branches'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String, index=True)
    avg_daily_traffic = Column(Integer)
    avg_daily_withdrawal = Column(Integer)
    avg_daily_deposit = Column(Integer)
    minimum_cash_requirement = Column(Integer)
    employees = relationship('Employee', back_populates='branch')

class Employee(Base):
    __tablename__ = 'employees'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    avg_daily_work_hours = Column(Integer)
    branch_id = Column(Integer, ForeignKey('bank_branches.id'))
    
    branch = relationship('BankBranch', back_populates='employees')