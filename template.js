function get(data) {
    return (
        "<html><body><h1>Contact</h1><h3>Information</h3><p><b>Name: </b>" + data.name + "</p><p><b>Email: </b>" + data.email + "</p><p><b>Subject: </b>" + data.subject + "</p><p><b>Message: </b>" + data.text + "</p><br></body></html>"
    );
}

module.exports = {
    get: get
}
