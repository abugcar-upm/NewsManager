export interface Article {
    id?: number;
    id_user: number;
    title: string;
    subtitle: string;
    abstract: string;
    body: string;
    category: string;
    update_date?: string;
    thumbnail_image?: string;
    thumbnail_media_type?: string;
    image_data: string;
    image_media_type: string;
}