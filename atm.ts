#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

///set balance and pin code
let myBalance = 10000;
let myPin = 1427;
// print a msg
console.log(chalk.blueBright("\n \tWelcome to Aliya's ATM\t \n"));

let pinAnswer =await inquirer.prompt([
    {
        name:"pin",
        type: "number",
        message: chalk.yellowBright("Enter your pin code:")
    }
])
if(pinAnswer.pin===myPin){
    console.log(chalk.green("Pin is correct, Login succesfully."));
    //console.log(`Current Account Balance is ${myBalance}`);


    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Ammount","Check Balance"],
        }
    ])
    if(operationAns.operation==="Withdraw Ammount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.gray("Select a withdraw method"),
                choices: ["Fast cash","Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000,10000,20000,50000]
                }
            ])
            if(fastCashAns.fastCash> myBalance ){
                console.log(chalk.red("insufficient Balance"));
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(chalk.blue`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns= await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:",
                }
            ])
            if(amountAns.amount>myBalance){
                 console.log("Insufficient balance");
            }
            else{
                myBalance -=amountAns.amount;
                 console.log(`${amountAns.amount} withdraw succesfully`);
                 console.log(chalk.blue`Your Remaining Balance is:${myBalance}`);
            }
        }
      
    
    }
    else if(operationAns.operation==="Check Balance"){
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}   

    
else {
    console.log(chalk.red("Your pin is incorrect, Try again."));
}
