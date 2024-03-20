from pydantic import BaseModel
from typing import Optional

class BankBranchUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    avg_daily_traffic: Optional[int] = None
    avg_daily_withdrawal: Optional[float] = None
    avg_daily_deposit: Optional[float] = None

class BankBranch(BaseModel):
    name: str
    address: str
    avg_daily_traffic : int
    avg_daily_withdrawal: int
    avg_daily_deposit: int

class EmployeeCreate(BaseModel):
    name: str
    email: str
    avg_daily_work_hours: int
    branch_id: Optional[int] = None