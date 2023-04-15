import config from "./config";

export const tracks: any = {
    1: {
        weightage: config.weightage.captcha
    },
    2: {
        weightage: config.weightage.vouching
    }
}

export const trackIds = [1, 2]