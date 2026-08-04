import React from 'react'
import PageTemplate from '../components/PageTemplate'

const sections = ['Support Categories','Warranty Claim','Complaint','Repair Request','Installation Request','Bulk Orders','Order Issue','Payment Issue','Technical Support','Live Chat','WhatsApp','Email','Phone','Support Ticket','Track Ticket']

export default function CustomerSupport(){
  return <PageTemplate title="Customer Support" sections={sections} lastUpdated="2026-08-02" />
}
