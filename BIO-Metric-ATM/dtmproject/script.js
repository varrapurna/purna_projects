// Function to enroll customer
function enrollCustomer() {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const balance = document.getElementById("balance").value;
    const fingerprint = document.getElementById("fingerprint").files[0];

    if (!name || !number || !balance || !fingerprint) {
        alert("Please fill in all fields.");
        return;
    }

    const customer = {
        name,
        number,
        balance,
        fingerprint: fingerprint.name // Store the name of the file (mock fingerprint)
    };

    // Retrieve any existing enrollments from localStorage
    let enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];

    // Add new customer
    enrollments.push(customer);

    // Save updated enrollments back to localStorage
    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    // Clear the form after enrolling
    document.getElementById("enrollment-form").reset();

    alert("Enrollment successful!");

    showAllEnrollments();
}

// Function to show all enrollments
function showAllEnrollments() {
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
    let enrollmentsList = "";

    if (enrollments.length === 0) {
        enrollmentsList = "<p>No enrollments available</p>";
    } else {
        enrollmentsList = "<ul>";
        enrollments.forEach((customer, index) => {
            enrollmentsList += `<li>${customer.name} - ${customer.number} - ${customer.balance} 
            <button onclick="deleteEnrollment(${index})">Delete</button></li>`;
        });
        enrollmentsList += "</ul>";
    }

    // Display enrollments in the dedicated section
    document.getElementById("enrollment-list").innerHTML = enrollmentsList;
}

// Function to delete a specific enrollment
function deleteEnrollment(index) {
    let enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
    enrollments.splice(index, 1);
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
    showAllEnrollments();
}

// Function to check balance
function checkBalance() {
    const number = document.getElementById("search-number").value;
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
    const customer = enrollments.find(cust => cust.number === number);

    if (customer) {
        document.getElementById("balance-output").innerText = `Balance: ₹${customer.balance}`;
    } else {
        document.getElementById("balance-output").innerText = "Customer not found!";
    }
}

// Function to request fingerprint before withdrawing
function requestFingerprint() {
    document.getElementById("withdraw-fingerprint").classList.remove("hidden");
    document.getElementById("withdraw-submit").classList.remove("hidden");
}

// Function to withdraw money (mock verification)
function withdrawMoney() {
    const number = document.getElementById("withdraw-number").value;
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
    const customer = enrollments.find(cust => cust.number === number);
    const fingerprintFile = document.getElementById("withdraw-fingerprint").files[0];

    if (customer && fingerprintFile) {
        // Fingerprint mock verification
        if (fingerprintFile.name === customer.fingerprint) {
            alert("Fingerprint verified successfully!");

            // Proceed with withdrawal
            let withdrawalAmount = prompt("Enter amount to withdraw:");
            withdrawalAmount = parseFloat(withdrawalAmount);

            if (withdrawalAmount && withdrawalAmount <= parseFloat(customer.balance)) {
                customer.balance -= withdrawalAmount;

                // Update localStorage after withdrawal
                localStorage.setItem("enrollments", JSON.stringify(enrollments));
                alert(`₹${withdrawalAmount} withdrawn successfully! New balance: ₹${customer.balance}`);

                // Clear input fields after withdrawal
                document.getElementById("withdraw-number").value = '';
                document.getElementById("withdraw-fingerprint").value = '';

                showAllEnrollments();
            } else {
                alert("Invalid withdrawal amount or insufficient balance.");
            }
        } else {
            alert("Fingerprint does not match the enrolled fingerprint.");
        }
    } else {
        alert("Customer not found or fingerprint not provided.");
    }
}


// Function to show the enroll section
function showEnrollment() {
    document.getElementById("enroll-section").classList.remove("hidden");
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("enrollment-list-section").classList.remove("hidden");

    showAllEnrollments();
}

// Function to show the banking section
function showBanking() {
    document.getElementById("banking-section").classList.remove("hidden");
    document.getElementById("main-menu").classList.add("hidden");
}

// Function to go back to the main menu
function goBack() {
    document.getElementById("enroll-section").classList.add("hidden");
    document.getElementById("banking-section").classList.add("hidden");
    document.getElementById("balance-section").classList.add("hidden");
    document.getElementById("withdraw-section").classList.add("hidden");
    document.getElementById("main-menu").classList.remove("hidden");
    document.getElementById("enrollment-list-section").classList.add("hidden");
}
