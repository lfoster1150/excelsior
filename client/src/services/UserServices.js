import Client from './api'

export const GetDataByUsername = async (username) => {
    try {
        const res = await Client.get(`/user/${username}`)
        return res.data.user[0]
    } catch (err) {
        console.log(err)
    }
}