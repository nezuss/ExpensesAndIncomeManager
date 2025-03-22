## Setup frontend
Go to frontend directory `cd Frontend`  
Install node packages `npm i` or `npm install`  
Run the app `npm start`  

## Setup backend
Create MSSQL database, and create tables Users(Username - varchar, Password - varchar), Expenses(Username - varchar, Name - varchar, Count - varchar, Category - varchar), Income(Username - varchar, Name - varchar, Count - varchar, Category - varchar), Category(Username - varchar, Name - varchar)  
Go to backend directory `cd Backend`  
Setup file `appsettings.json` with your string connection to database  
Run the app `dotnet run` or if you using Visual Studio just press the green button on top of the screen  
