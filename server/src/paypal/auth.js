let sandboxCredentials = {
  api: "AUg28rA_kDJ2Mzq3xOYgbMaDmwNj_ffFlJPwn_ix38DcPdH0kb2yAAfPDaj1w9Q2QlnhV4aLzhkPkKuM",
  secret: "EEMBzW6aszNo_7OCMZIYqpYApB-_UxfW3iezwbjObI6ASiVhujlXSK9K29im8hRFtM8URzie5ACGwtHZ",
  url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
  orderUrl: "https://api-m.sandbox.paypal.com/v2/checkout/orders"
}

let liveCredentials = {
  api: "AV9Y7asNM_Ytto7cpXB0JfSwW1gQkcqV055uACc9dd7Oelp3POVR8eaRQYEIlS2EW0i7OU0BQx3UgL_u",
  secret: "EB2A-R1My5xkA8Pb0HNjNNjRM-5w2EQiti0icUN7QfVyeSZ87IWALkNPNifwwhCczvR0FjGb4aCDtqw9",
  url: "",
  orderUrl: ""
}

module.exports = {
  sandboxCredentials, liveCredentials
}
