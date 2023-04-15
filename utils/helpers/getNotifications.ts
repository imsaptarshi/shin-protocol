import * as PushAPI from "@pushprotocol/restapi";

export default async function getNotifications(address: string) {
    const notifications: [] = await PushAPI.user.getFeeds({
        user: 'eip155:80001:' + address,


        env: "staging"
    });

    const spam: [] = await PushAPI.user.getFeeds({
        user: 'eip155:80001:' + address,
        spam: true,

        env: "staging"
    });
    let n: any = []
    let _n: any = []

    notifications.forEach((data: any, key: any) => {
        if (data.app == "Shin Protocol") {
            n.push(data)
        }
    })

    spam.forEach((data: any, key: any) => {
        if (data.app == "Shin Protocol") {
            _n.push(data)
        }
    })
    console.log(n, _n)
    //console.log(n)
    return [...n, ..._n]

}