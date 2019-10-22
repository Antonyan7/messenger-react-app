export interface IUsersListResponse {
    alias: string
    created_at: string
    created_by: string
    deleted: boolean
    description: string
    exposed: boolean
    id: number
    image_url: string
    participants: Array<string>
    title: string
    type: string
    unread_count: number
    updated_at: string
    updated_by?: string
    uuid: string
}
