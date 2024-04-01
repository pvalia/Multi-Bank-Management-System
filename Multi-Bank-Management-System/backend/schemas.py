from pydantic import BaseModel
from typing import List, Optional


class BankBranchUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    avg_daily_traffic: Optional[int] = None
    avg_daily_deposit: Optional[int] = None
    avg_daily_withdrawal: Optional[int] = None


class BankBranch(BaseModel):
    name: str
    address: str
    avg_daily_traffic : int
    avg_daily_deposit: int
    avg_daily_withdrawal: int

    minimum_cash_requirement: Optional[float] = 0.0

class Employee(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    avg_daily_work_hours: int
    branch_id: Optional[int] = None

class BankBranch(BankBranch):
    id: Optional[int] = None
    employees: List[Employee] = []

    class Config:
        orm_mode = True