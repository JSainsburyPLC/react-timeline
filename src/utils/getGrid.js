const getGrid = timebar => (timebar.find(row => row.useAsGrid) || {}).cells

export default getGrid
