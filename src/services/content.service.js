import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('content/index-content-admin', {params});
    },
    show(id) {
        return Service().get('content/show/'+id);
    },
    create(params) {
        return Service().post('content/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('content/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('content/delete/'+id);
    }
}