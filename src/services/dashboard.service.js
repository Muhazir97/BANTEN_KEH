import Service from '@/helpers/service'

export default {

    contentPopuler() {
        return Service().get('dashboard/content-terpopuler');
    },
    cardKamus() {
        return Service().get('dashboard/card-kamus');
    },
    cardContent() {
        return Service().get('dashboard/card-content');
    },
}