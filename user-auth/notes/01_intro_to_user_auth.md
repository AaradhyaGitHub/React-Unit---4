What is authentication? 
> Certain resources like backend routes should be protected 
> Front-End then should authenticate before accessing that backend 

How does client get permission from backend? 
    > Sending a request with user credentials 
    > Backend validates or creates new user 
    > If valid email/password -> server responds with access granted or denied 



A yes or no response from server is not enough. If a server says yes and in the future, we append that information, 
that is not enough because that can be faked 

So the server response needs to be more robust. So we can't save a "YES" to grant access. This can be faked. 

2 solutions: 

1) Server-side sessions:
    > Popular for full stack app 
    > Not ideal for React 
    > After authentication, a unique identifier. Basically, storing the "yes" 
    > Map that yes to a specific client with help of an id 
    > id is sent back to the client 
    > Client send the id with future requests to acess protected resources
    > Since a "yes" is stored in the server mapped to the user
    > Server checks and gives access 
    > They require a tight coupling between front end and back end


But with React apps, we are talking to decoupled backend APIs which are not storing client side information..

This is where Authentication Tokens come into play: 

2) Authentication Tokens:
    > After authenticating a user, create a permission token (some string generated using some algorithm)
    > Send token back to the client 
    > This token can only be validated and proven by backend that created that token 
    > Because this token is created by some private key which only this backend is aware of 
    > In future request, client attaches token to their requests for accessing resources 
    > Server then looks at the token and sees if it created the token and validates it 
    > If valid: permission is granted



