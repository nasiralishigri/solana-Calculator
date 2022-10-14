const assert = require("assert");
const anchor = require("@project-serum/anchor");
const {SystemProgram} = anchor.web3;

// import * as anchor from '@project-serum/anchor'; // includes https://solana-labs.github.io/solana-web3.js/
// const { SystemProgram } = anchor.web3; // Added to initialize account

describe("calculator", () => {
  let provider = anchor.AnchorProvider.local();
  const program = anchor.workspace.Calculator;
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();;
  // console.log("Calculator",anchor.workspace.Calculator)

  it("Create Calculator", async()=>{

    try{
      await program.rpc.create("Hello First Time Calling Solana",{
        accounts:{
           calculator: calculator.publicKey,
           user: provider.wallet.payer._keypair.publicKey,
           systemProgram: SystemProgram.programId
        }
        ,
        signers:[calculator]
      })

    }catch(err){
      console.log("errror ",err)
    }
    // console.log(
    //   `Successfully intialized Blog ID: for Blogger ${this.provider.wallet.publicKey}`
    // );
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === "Hello First Time Calling Solana")
  })

  it("Test Addtion of Two numbers", async()=>{
   await program.rpc.add(new anchor.BN(3),new anchor.BN(5),{
    accounts:{
    calculator:calculator.publicKey
    }
    
  })
  const account = await program.account.calculator.fetch(calculator.publicKey);
  assert.ok(account.result.toString()==="8")
  })
 
it("Subtract Two numbers", async()=>{
  await program.rpc.sub(new anchor.BN(10), new anchor.BN(5), {
    accounts:{
      calculator: calculator.publicKey
    }
  })
  const account = await program.account.calculator.fetch(calculator.publicKey);
  assert.ok(account.result.toString() === "5");
})
it("Multiply Two numbers", async()=>{
  await program.rpc.mul(new anchor.BN(4), new anchor.BN(4),{
    accounts:{
      calculator: calculator.publicKey
    }
  })
  const account =await program.account.calculator.fetch(calculator.publicKey);
   assert.ok(account.result.toString() === "16");
})

it("Divide Two numbers", async()=>{
  await program.rpc.div(new anchor.BN(4), new anchor.BN(4),{
    accounts:{
      calculator: calculator.publicKey
    }
  })
  const account =await program.account.calculator.fetch(calculator.publicKey);
   assert.ok(account.result.toString() === "1");
})

it("Remender Two numbers", async()=>{
  await program.rpc.rem(new anchor.BN(41), new anchor.BN(4),{
    accounts:{
      calculator: calculator.publicKey
    }
  })
  const account =await program.account.calculator.fetch(calculator.publicKey);
   assert.ok(account.result.toString() === "1");
})
});
