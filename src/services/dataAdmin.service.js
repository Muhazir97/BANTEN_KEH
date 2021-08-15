import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('admin/index', {params});
    },
    show(id) {
        return Service().get('admin/show/'+id);
    },
    create(params) {
        return Service().post('admin/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('admin/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('admin/delete/'+id);
    }
}