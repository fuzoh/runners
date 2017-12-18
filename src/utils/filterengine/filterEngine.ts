import FilterEngine from './engine'
import Filter from './filter'

interface FilterObject {
  [key: string]: Filter
}

export const filters: FilterObject = {
  all: new Filter(a => true),
  hideNotReady: new Filter(a => a.ready),
  hideCompleted: new Filter(a => !a.completed),
  mine: new Filter(function(a) {
    const user = this.externalData
    return user.belongsToRun(a)
  }),
}

filters.all.onEnable = () => {
  for (let key in filters) {
    if (key === 'all') continue
    filters[key].enable()
  }
}
filters.all.onDisable = () => {
  for (let key in filters) {
    if (key === 'all') continue
    filters[key].disable()
  }
}

export const filterEngine = new FilterEngine()

filterEngine.filters = Object.keys(filters).map(key => filters[key])