const fedexXmlBody = (key, password, accNum, meterNum, trackingNum) => {
  return (
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v16="http://fedex.com/ws/track/v16">
      <soapenv:Header/>
      <soapenv:Body>
          <v16:TrackRequest>
              <v16:WebAuthenticationDetail>
                  <v16:UserCredential>
                      <v16:Key>${key}</v16:Key>
                      <v16:Password>${password}</v16:Password>
                  </v16:UserCredential>
              </v16:WebAuthenticationDetail>
              <v16:ClientDetail>
                  <v16:AccountNumber>${accNum}</v16:AccountNumber>
                  <v16:MeterNumber>${meterNum}</v16:MeterNumber>
              </v16:ClientDetail>
              <v16:TransactionDetail>
                  <v16:CustomerTransactionId>Track By Number_v16</v16:CustomerTransactionId>
                  <v16:Localization>
                      <v16:LanguageCode>EN</v16:LanguageCode>
                      <v16:LocaleCode>US</v16:LocaleCode>
                  </v16:Localization>
              </v16:TransactionDetail>
              <v16:Version>
                  <v16:ServiceId>trck</v16:ServiceId>
                  <v16:Major>16</v16:Major>
                  <v16:Intermediate>0</v16:Intermediate>
                  <v16:Minor>0</v16:Minor>
              </v16:Version>
              <v16:SelectionDetails>
                  <v16:PackageIdentifier>
                      <v16:Type>TRACKING_NUMBER_OR_DOORTAG</v16:Type>
                      <v16:Value>${trackingNum}</v16:Value>
                  </v16:PackageIdentifier>
                  <v16:ShipmentAccountNumber/>
                  <v16:SecureSpodAccount/>
                  <v16:Destination>
                      <v16:GeographicCoordinates>rates evertitque aequora</v16:GeographicCoordinates>
                  </v16:Destination>
              </v16:SelectionDetails>
          </v16:TrackRequest>
      </soapenv:Body>
    </soapenv:Envelope>`
  )
};

module.exports = fedexXmlBody;
