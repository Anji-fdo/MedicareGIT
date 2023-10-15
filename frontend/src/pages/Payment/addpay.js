const [formData, setFormData] = useState({
    appointmentNumber: '',
    amount: '',
    paymentType: 'Cash',
    date: ''
});


const navigate = useNavigate(); 

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/payment/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Payment successful, navigate to a success page or perform other actions
            navigate(`/paymentsuccess/${formData.appointmentNumber}`);
        } else {
            // Handle error scenarios, maybe display an error message to the user
            console.error('Payment failed');
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error occurred:', error);
    }
};
