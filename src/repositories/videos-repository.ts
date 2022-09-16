import addDays from 'date-fns/addDays'

const videos: Array<VideoType> = [{id: 0, title: 'cats', author: 'Popov', canBeDownloaded: true,
    createdAt: new Date() , minAgeRestriction: 0, publicationDate: new Date(),
    availableResolutions: []},
    //{id: 1, title: 'dogs', author: 'Ivanov', canBeDownloaded: true,
    // createdAt: new Date().toISOString(), publicationDate: new Date().toISOString(),
    // availableResolutions: []}
]


type VideoType = {
    id: number
    title: string
    author: string
    availableResolutions: Array<string>
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: Date
    publicationDate: Date
}

export const videosRepository = {
    createVideo(title: string, author: string, availableResolutions: Array<string>) {
        //TODO: создать в videosService
        //TODO: перенести логику создания видео в service
        const dateNow: Date = new Date()
        const newVideo =
            {
                id: +dateNow,
                title: title,
                author: author,
                availableResolutions: availableResolutions,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: dateNow,
                publicationDate: addDays(dateNow, 1),
            }
        videos.push(newVideo)
        return newVideo
    },
    findVideoById(id: number) {
        let video = videos.find(v => v.id === id)
        return video
    },
    updateVideo(id: number, title: string, author: string) {
        let video = videos.find(v => v.id === id)
        if(video) {
            video.title = title,
                video.author = author
            return true;
        } else {
            return false;
        }
    },
    deleteVideoById(id: number) {
        for(let i = 0; i < videos.length; i++) {
            if(videos[i].id === id) {
                videos.splice(i, 1)
                return true;
            }
        }
        return  false;
    },
    seeVideo() {
        return videos
    },
    deleteAllVideo() {
        videos.splice(0, videos.length)
    }
}