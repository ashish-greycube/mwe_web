import frappe

@frappe.whitelist(allow_guest=True)
def create_lead(name, company, email, phone, notes):
    lead = frappe.get_doc({
        'doctype': 'Lead',
        'lead_name': name,
        'company_name': company,
        'email_id': email,
        'phone': phone,
        'notes': notes,
        'source': 'Website'
    })
    lead.insert(ignore_permissions=True)
    frappe.db.commit()
    return lead.name