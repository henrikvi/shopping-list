const handleToggle = (id, setListItems, listItems) => () => {
    setListItems(listItems.map(item => item.id !== id ?
        item : { ...item, checked: !item.checked }
    ))
}

export default handleToggle