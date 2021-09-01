import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('quiz/index', {params});
    },
    show(id) {
        return Service().get('quiz/show/'+id);
    },
    create(params) {
        return Service().post('quiz/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('quiz/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('quiz/delete/'+id);
    }
}