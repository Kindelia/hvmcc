use crate::fun::{Expr, Id};

#[derive(Clone, Debug)]
pub enum Imp {
  Sequence { stmt1: Box<Imp>, stmt2: Box<Imp> },
  Assignment { name: Id, expr: Expr },
  Expression { expr: Expr },
  MatchStmt { expr: Expr, cases: Vec<CaseStmt>, default: Option<Box<Imp>> },
  IfElse { condition: Expr, true_case: Box<Imp>, false_case: Box<Imp> },
  ForElse { initialize: Box<Imp>, condition: Expr, afterthought: Box<Imp>, body: Box<Imp>, else_case: Box<Imp> },
  ForInElse { target: Id, iterator: Expr, body: Box<Imp>, else_case: Box<Imp> },
  WhileElse { condition: Expr, body: Box<Imp>, else_case: Box<Imp> },
  Label { name: Id, stmt: Box<Imp> },
  Return { value: Expr },
  Goto { name: Id },
  Continue, 
  Break,
  Pass,
}

#[derive(Clone, Debug)]
pub struct CaseStmt {
  matched: Expr,
  body: Imp,
}

#[derive(Clone, Debug)]
pub struct Procedure {
  name: Id,
  arguments: Vec<Id>,
  body: Imp,
}

pub type Program = Vec<Procedure>;

pub fn imp_to_fun(imperative: Imp) -> Expr {
  todo!()
}
