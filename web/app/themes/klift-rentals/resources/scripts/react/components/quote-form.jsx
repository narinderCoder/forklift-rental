import { useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Quote from '../icons/quote';
import XIcon from '../icons/x';
import EnvProvider from '@scripts/react/EnvVar';
import axios from 'axios';


const required_error = 'This field is required';

const schema = z.object({
  fname: z.string({ required_error }).min(1, required_error),
  lname: z.string({ required_error }).min(1, required_error),
  email: z.string({ required_error }).email({ message: 'Enter a valid email' }),
  phone: z
    .string({ required_error })
    .min(10, 'Enter a valid phone number')
    .max(10, 'Enter a valid phone number'),
  address: z.string({ required_error }).min(1, required_error),
  city: z.string({ required_error }).min(1, required_error),
  state: z.string({ required_error }).min(1, required_error),
  zip_code: z.string({ required_error }).min(1, required_error),
  company_name: z.string({ required_error }).min(1, required_error),
  comments: z.string().optional().nullable(),
  product_id: z.string().optional().nullable(),
});

const QuoteForm = ({ show = false, setShow, product, setLoading}) => {
  const ref = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {

    data.product_id = product?.id;
    setLoading(true);

    const customData = {
      ...data,  
      product_id:product?.id, // Assuming you want to include the product ID as a custom field
    };
    
    const response = await axios.post(
      `${EnvProvider.baseUrl}custom-form-submission/post-quote`,
      data
    );
    console.log(response,'response');
    alert(response.data.message);
    if(response.status == 200){
      setLoading(false);
      setShow(false);
      reset()

    }else{
      setLoading(false);
    }

  };

  useOutsideClick(ref, () => setShow(false));

  return (
    <div className={`w-100 h-100 ${show ? 'd-block' : 'd-none'}`}>
      <div
        className={
          'container p-md-4 py-2 px-1 mx-auto bg-white border rounded-3'
        }
        style={{
          zIndex: 99,
          position: 'fixed',
          transform: 'translateX(-50%) translateY(-50%)',
          top: '50%',
          left: '50%',
          height: 'calc(100% - 4rem)',
          weight: 'calc(100% - 1rem)',
        }}
        ref={ref}
      >
        <div
          className="d-flex align-items-center justify-content-between px-10"
          style={{ padding: '0 2.5rem' }}
        >
          <div className="d-flex align-items-center gap-md-4 gap-2 text-primary">
            <Quote size={40} />
            <h4 className="h4 text-secondary">Get a quote</h4>
          </div>

          <div
            onClick={() => setShow(false)}
            className="d-flex align-items-center justify-content-center p-2 rounded-circle text-secondary bg-secondary bg-opacity-40"
            style={{ cursor: 'pointer' }}
          >
            <XIcon />
          </div>
        </div>
        <div className="quote-form-modal-data">
          <p className="my-4 text-center p1">
            Asterisk indicates <span className="text-primary">Required</span>{' '}
            Field
          </p>

          <form
            className="d-flex flex-column gap-4-5 px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="w-100 position-relative">
                <input
                  {...register('fname')}
                  className="input-primary"
                  placeholder="First Name"
                />
                {errors.fname && (
                  <p className="text-danger position-absolute error-quote-form">
                    {errors.fname.message}
                  </p>
                )}
              </div>
              <div className="w-100 position-relative">
                <input
                  {...register('lname')}
                  className="input-primary"
                  placeholder="Last Name"
                />

                <p className="p3 text-danger position-absolute error-quote-form">
                  {errors.lname && errors.lname.message}
                </p>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="w-100 position-relative">
                <input
                  {...register('email')}
                  className="input-primary"
                  placeholder="Email"
                />

                <p className="p3 text-danger position-absolute error-quote-form">
                  {errors.email && errors.email.message}
                </p>
              </div>
              <div className="w-100 position-relative">
                <input
                  {...register('phone')}
                  className="input-primary"
                  placeholder="Phone"
                />

                <p className="p3 text-danger position-absolute error-quote-form">
                  {errors.phone && errors.phone.message}
                </p>
              </div>
            </div>
            <div className="position-relative">
              <input
                {...register('address')}
                className="input-primary"
                placeholder="Address"
              />

              <p className="p3 text-danger position-absolute error-quote-form">
                {errors.address && errors.address.message}
              </p>
            </div>
            <div className="position-relative">
              <input
                {...register('city')}
                className="input-primary"
                placeholder="City"
              />

              <p className="p3 text-danger position-absolute error-quote-form">
                {errors.city && errors.city.message}
              </p>
            </div>
            <div className="position-relative">
              <input
                {...register('state')}
                className="input-primary"
                placeholder="State"
              />

              <p className="p3 text-danger position-absolute error-quote-form">
                {errors.state && errors.state.message}
              </p>
            </div>
            <div className="position-relative">
              <input
                {...register('zip_code')}
                className="input-primary"
                placeholder="Zip code"
              />

              <p className="p3 text-danger position-absolute error-quote-form">
                {errors.zip_code && errors.zip_code.message}
              </p>
            </div>
            <div className="position-relative">
              <input
                {...register('company_name')}
                className="input-primary"
                placeholder="Company Name"
              />

              <p className="p3 text-danger position-absolute error-quote-form">
                {errors.company_name && errors.company_name.message}
              </p>
            </div>
            <div className="position-relative">
              <input
                {...register('comments')}
                className="input-primary"
                placeholder="Comments/Questions"
              />

              <p className="p3 text-danger position-absolute error-quote-form">
                {errors.comments && errors.comments.message}
              </p>
            </div>
            <div className="mx-auto">
              <button
                type="submit"
                className="justify-content-center btn-secondary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          show ? 'bg-secondary opacity-50 w-100 h-100 d-block' : 'd-none'
        }
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transition: 'all 0.3s',
        }}
      />
    </div>
  );
};

export default QuoteForm;
