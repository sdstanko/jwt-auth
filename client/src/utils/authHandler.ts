export default async function (action: () => Promise<any>) {
    try {
        await action();
    } catch (e) {
        console.log(e);
    }
}
