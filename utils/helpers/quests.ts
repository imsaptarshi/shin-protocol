export const quests: any = {
    1: {
        name: "ENS Address Holder",
        image: "ipfs://bafybeihmes2rb6ugkacftqf2o65bahhdxcfoxycjziblsnz3j6677wntea",
        description: "Hold an ENS domain to complete this quest",
        price: 0,
        external_url: process.env.NEXT_APP_HOST || "https://shin-protocol.up.railway.app/",
        ipfsHash: "bafkreihrzwroqqzua633mgfmk76alby6eiq46e5k3ogenhiarwwpknajvq",
        points: 20
    },
    2: {
        name: "Lens Handle Holder",
        image: "ipfs://bafybeibxab2wh4da2sqyvlj4g37nbirem4uasrvw2s46rqk34eogc3ppcu",
        description: "Hold a Lens handle to complete this quest.",
        price: 0,
        external_url: process.env.NEXT_APP_HOST || "https://shin-protocol.up.railway.app/",
        ipfsHash: "bafkreihc4vmrggcuqs4sn3hfwj7vze5f7i2saio5rulrctnnuwisbwjsj4",
        points: 20
    }
}

export const questIds = [1, 2]