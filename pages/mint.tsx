import { CandyMachine, Metaplex } from "@metaplex-foundation/js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";
import { CANDY_MACHINE_ADDRESS } from "../lib/constants";

export default function mint() {
    const { connection } = useConnection();
    const [candyMachineAddress, setCandyMachineAddress] = useState(undefined);
    const [candyMachineMintAddr, setCandyMachineMintAddr] = useState(undefined);
    const [candyMachineMaxSupply, setCandyMachineMaxSupply] = useState(69);
    const [candyMachineItemsMinted, setCandyMachineItemsMinted] = useState(69);
    const [candyMachineItemsRemaining, setCandyMachineItemsRemaining] = useState(69);
    const [mintAmount , setMintAmount] = useState(1);
    const [mintCost , setMintCost] = useState(.03);
  
    const metaplex = Metaplex
      .make(connection)
  
    const candyMachines = metaplex.candyMachines();
  
    async function fetchCandyMachine() {
      const fetched = await candyMachines
        .findByAddress({ address: CANDY_MACHINE_ADDRESS });
  
      console.log("Fetched candy machine!", fetched)
      console.log(fetched.itemsAvailable.toNumber(), fetched.itemsRemaining)
      console.log(fetched.itemsMinted.toNumber() , fetched.symbol, fetched.address, fetched.collectionMintAddress)
      setCandyMachineAddress(fetched.address);
      setCandyMachineMintAddr(fetched.collectionMintAddress);
      setCandyMachineMaxSupply(fetched.itemsAvailable.toNumber());
      setCandyMachineItemsMinted(fetched.itemsMinted.toNumber());
      setCandyMachineItemsRemaining(fetched.itemsRemaining.toNumber());
  
  
      //setCandyMachine(fetched);
    }
  
    useEffect(() => {
      fetchCandyMachine()
    }, [])

    async function incrementMint() {
        if (mintAmount <= 4) {
            setMintAmount(mintAmount+1);
            setMintCost((mintAmount+1)*0.03);
        }  
    }

    async function decrementMint() {
        if (mintAmount >= 2) {
            setMintAmount(mintAmount-1);
            setMintCost((mintAmount-1)*0.03);
        }
    }
  
    const canMint = candyMachineItemsRemaining > 0
  return (
    <main className="flex flex-col gap-8">
    <div className="flex flex-row gap-10">
    <img src="./images/ap_ex.png" width="50%" />
    <div className="flex flex-col gap-10 items-center">
    <PageHeading>Gucci Man </PageHeading>
    <p className="text-white text-sm text-indent: 20px">
    This project uses 2021 Census Data and ACS Data (American Community Survey) to get shape and socioeconomic data on all 73,057 census tracts in the United States. This data is used to construct a generative collection of 3,143 generative artworks, one artwork per county in the United States. This collection hopes to explore the issues involved with trying to represent or visualize such a wide body of people and range of land using this data.
      </p>
      <p className="text-white text-sm">
      All artworks are produced generatively in p5.js using the FIPS county code as the seed for randomness. All artworks and the associated code for image generation are stored immutably on Arweave (links can be found on twitter, or on-chain). 
      </p>
      <p className="text-white text-sm">
      Mints will be priced at .03 per piece, with a max mint amount of 5 per wallet. As mentioned there is one piece per county in the US, making a total collection size of 3,143.
      </p>
      <div className="flex flex-row gap-10">
       <button type="button" className=" text-5xl text-indigo-700" onClick={incrementMint}>+</button>
       <p className="text-white text-5xl items-center">{mintAmount}</p>
       <button type="button" className=" text-5xl text-indigo-700" onClick={decrementMint}>-</button>
      </div>
    <button 
    type="button"
    className="inline-flex position-relative items-center px-60 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md cursor-pointer hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={!canMint}
  >
    Mint 🦖
  </button>
  {candyMachineItemsRemaining ? 
    <div className="flex flex-col items-center gap-8">
    <p className="text-white text-lg"> Total Cost : {mintCost} </p>
      <PageHeading>
          Items Remaining: {candyMachineItemsRemaining} / {candyMachineMaxSupply}
      </PageHeading>
    </div>
     : <p className="text-white text-sm">Connect Wallet to Proceed!</p>
    }
 </div>
 </div>
  </main>
  )
}
