import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('kamus/index-admin', {params});
    },
    show(id) {
        return Service().get('kamus/show/'+id);
    },
    create(params) {
        return Service().post('kamus/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('kamus/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('kamus/delete/'+id);
    }
}