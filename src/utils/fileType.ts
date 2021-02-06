const isVideo = (name: string): boolean => {
    name = name || ''
    const allVideoName = ['avi', 'rmvb', 'rm', 'asf', 'divx', 'mpg', 'mpeg', 'mpe', 'wmv', 'mp4', 'mkv', 'vob'];
    const lastSplite = name.lastIndexOf("/");
    return allVideoName.includes(name.substr(lastSplite + 1))
}

const isImage = (name: string): boolean => {
    name = name || ''
    const allImageName = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'];
    const lastSplite = name.lastIndexOf("/");
    return allImageName.includes(name.substr(lastSplite + 1))
}

export { isImage, isVideo }