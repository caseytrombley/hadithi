import {shallowMount, createLocalVue} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Members from '@/views/Members';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const factory = (values = {}) => {
    return shallowMount(Members, {
        router,
        localVue,
        data() {
            return {
                ...values
            }
        }
    })
}

describe('Members', () => {

    it('renders email address during sign-up', () => {
        const wrapper = factory({pageMode: "sign-up"});
        expect(wrapper.findAll(".form-label").at(2).text()).toEqual("Email address");
    });

    it('renders terms and conditions during sign-up', () => {
        const wrapper = factory({pageMode: "sign-up"});
        expect(wrapper.find(".form-check-label").exists()).toBe(true);
    });

    it('hide no password fields during reset-password', () => {
        const wrapper = factory({pageMode: "resetPassword"});
        expect(wrapper.find("input[type='password']").exists()).toBe(false);
    });

    it('hide terms and conditions during sign-in', () => {
        const wrapper = factory({pageMode: "sign-in"});
        expect(wrapper.find(".form-check-label").exists()).toBe(false);
    });
})
