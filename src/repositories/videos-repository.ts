const videos: Array<VideoType> = [{id: 0, title: 'cats', author: 'Popov', canBeDownloaded: true,
    createdAt: "2022-09-13T20:13:52.567Z", publicationDate: "2022-09-13T20:13:52.567Z",
    availableResolutions: []},
    {id: 1, title: 'dogs', author: 'Ivanov', canBeDownloaded: true,
    createdAt: "2021-09-13T20:13:50.567Z", publicationDate: "2021-09-13T20:13:32.567Z",
    availableResolutions: []}]

type VideoType = {
    title: string
    author: string
    availableResolutions: Array<string>
    id?: number
    canBeDownloaded?: boolean
    minAgeRestriction?: number
    createdAt?: string
    publicationDate?: string
}

export const videosRepository = {
    createVideo(title: string, author: string, availableResolutions: Array<string>) {
        const newVideo =
            {
                id: +(new Date()),
                title: title,
                author: author,
                availableResolutions: availableResolutions
            }
        videos.push(newVideo)
        return videos
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
        return  404;
    },
    seeVideo() {
        if(videos) {
            return videos
        } else {
            return false
        }
    }
}