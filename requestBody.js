const upsReqBody = (user, password, aln, inquiry) => {
  return `
  { 
    "UPSSecurity": {
      "UsernameToken": {
        "Username": ${user},
        "Password": ${password}
      },
      "ServiceAccessToken": {
        "AccessLicenseNumber": ${aln}
      }
    },
    "TrackRequest": {
      "Request": {
        "RequestOption": "1",
        "TransactionReference": {
          "CustomerContext": "Your Test Case Summary Description"
        }
      },
      "InquiryNumber": ${inquiry}
    }
  }`
};

module.exports = upsReqBody;
