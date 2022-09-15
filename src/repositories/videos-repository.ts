const videos: Array<VideoType> = [{id: new Number(), title: new String(), author: 'Popov', canBeDownloaded: true,
    createdAt: new Date().toISOString() , publicationDate: new Date().toISOString(),
    availableResolutions: []},
    {id: 1, title: 'dogs', author: 'Ivanov', canBeDownloaded: true,
    createdAt: new Date().toISOString(), publicationDate: new Date().toISOString(),
    availableResolutions: []}]

type VideoType = {
    title: String
    author: String
    availableResolutions: Array<string>
    id?: Number
    canBeDownloaded?: boolean
    minAgeRestriction?: Number
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
        return  false;
    },
    seeVideo() {
        return 200
    }
}