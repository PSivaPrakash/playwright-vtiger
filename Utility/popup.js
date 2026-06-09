export async function switchToPopup(page, action)
{
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        action()
    ])

    await popup.waitForLoadState()

    return popup
}