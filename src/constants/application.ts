const base = '/api';

export default {
  url: {
    base,
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
    cluster: process.env.CLUSTER || 'devnet',
    auctionHouseProgram: process.env.AUCTION_HOUSE_PROGRAM || 'hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk'
  },
  RPCUrl: {
    'devnet': 'https://metaplex.devnet.rpcpool.com',
    'testnet': 'https://api.testnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com'
  }
};
