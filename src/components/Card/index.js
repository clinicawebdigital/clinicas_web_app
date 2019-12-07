import React from 'react';

export function Card({ children }) {
  return <div className="card card-primary card-outline">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
}

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
}
