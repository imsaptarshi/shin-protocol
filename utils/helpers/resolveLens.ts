import axios from 'axios'
export const getLensHandle = async (address: string) => {
    const headers = {
        'content-type': 'application/json',
    }
    const lensGraphURL = 'https://api.lens.dev'
    const graphqlQuery = {
        operationName: 'DefaultProfile',
        // variables: {},
        query: `query DefaultProfile {
            defaultProfile(request: {ethereumAddress:"${address.toLowerCase()}" }) {
              handle
            }
          }
      `,
    }

    const res = await axios({
        url: lensGraphURL,
        method: 'POST',
        data: graphqlQuery,
        headers,
    })

    if (!!res.data?.errors?.length) {
        throw new Error('Error fetching lens domains')
    }

    return res.data
}