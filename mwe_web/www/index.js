```javascript
// Replace the form submit handlers with:
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    frappe.call({
        method: 'mwe_web.www.index.create_lead',
        args: {
            name: this.name.value,
            company: this.company.value,
            email: this.email.value,
            phone: this.phone.value,
            notes: this.notes.value
        },
        callback: function(r) {
            alert('Thank you! We will contact you soon.');
        }
    });
});
```