export async function selectByText(element, text)
{
    await element.selectOption(text)
}