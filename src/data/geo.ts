/** Tanzania outline for the region maps (viewBox "-8 12 316 316"). */
export const TZ_PATH =
  'M124.8,21.7L129.4,24.7L228.5,80.4L230.3,96.3L269.6,123.7L257.0,157.5L258.6,173.1L276.1,183.1L276.9,190.3L269.4,206.9L271.0,215.3L269.2,228.5L278.7,245.8L290.1,273.2L300,279.2L278.3,295.3L248.4,306.2L232.0,305.7L222.3,314.1L203.3,314.8L196.1,318.3L163.2,310.5L142.7,312.7L135.1,274.9L125.7,261.9L120.3,254.3L93.5,249.1L78.0,240.8L60.6,236.1L49.7,231.5L38.3,224.5L23.5,189.7L7.7,174.3L2.3,158.4L4.9,144.1L0,118.8L11.3,117.5L21.3,107.6L31.9,93.3L38.7,87.6L38.4,78.7L32.5,72.5L30.9,61.7L38.8,58.3L40.3,42.1L29.5,26.7L39.2,23.5L69.1,23.8Z'

/** Map coordinates per region id, in the TZ_PATH coordinate space. */
export const PTS: Record<string, [number, number]> = {
  kilimanjaro: [218.7, 87.3],
  kigoma: [8, 129.3],
  mbeya: [112.4, 239.9],
  mbozi: [98.2, 245.5],
  ruvuma: [172.5, 289.3],
  kagera: [67.5, 32.1],
  dar: [271.7, 182.6],
}

export const ALTITUDES: Record<string, string> = {
  kilimanjaro: '1,400–1,800 m',
  kigoma: '1,300–1,700 m',
  mbeya: '1,200–2,000 m',
  mbozi: '1,300–1,900 m',
  ruvuma: '900–1,500 m',
  kagera: '1,100–1,500 m',
}
