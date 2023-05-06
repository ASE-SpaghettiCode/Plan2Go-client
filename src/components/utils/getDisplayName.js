export default function getDisplayName(item) {
    let display_name = ''
    const proper_list = ['name', 'street', 'housenumber', 'locality', 'postcode', 'city', 'country']
    {
        proper_list.map((proper) => {
            if (item.properties[proper]) {
                display_name += item.properties[proper] + ', '
            }

        })
    }
    return display_name.trim();
}