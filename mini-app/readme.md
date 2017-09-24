Index.js is the main entry to the mini-app.

After user scanned the QRCode,
1. The mini-app will try to get the query from qrcode(url), the query contains the hashId of the event(hashId is the unique string to the event).
2. When mini-app is ready to launch, mini-app will try to get the userinfo and fetch the event detail from our API server.
3. After mini-app was launched, display the basic information of the event and show a check in button on the screen.
4. User are able to click the check-in button and will send request to our API server.
5. After check-in successfully, the screen will show the success message.