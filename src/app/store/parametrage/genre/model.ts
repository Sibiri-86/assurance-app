
export interface Genre {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface GenreList {
    genreDtoList?: Array<Genre>
}