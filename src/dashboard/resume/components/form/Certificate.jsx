import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeContext } from '@/context/ResumeContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Certificates() {
    const [certificationsList, setCertificationsList] = useState([{ name: '', issuer: '', year: '' ,link:''}]);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

    useEffect(() => {
        if (resumeInfo?.certifications) {
            setCertificationsList(resumeInfo.certifications);
        }
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = certificationsList.slice();
        newEntries[index][name] = value;
        setCertificationsList(newEntries);
    };

    const addNewCertification = () => {
        setCertificationsList([...certificationsList, { name: '', issuer: '', year: '',link:'' }]);
    };

    const removeCertification = () => {
        if (certificationsList.length > 1) {
            setCertificationsList(certificationsList.slice(0, -1));
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                certifications: certificationsList.map(({ id, ...rest }) => rest),
            },
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(() => {
                setLoading(false);
                toast('Details updated!');
            })
            .catch(() => {
                setLoading(false);
                toast('Server Error, Try again!');
            });
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            certifications: certificationsList,
        });
    }, [certificationsList]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Certifications</h2>
            <p>Add your professional certifications</p>

            <div>
                {certificationsList.map((item, index) => (
                    <div key={index} className='flex flex-col mb-2 border rounded-lg p-3 gap-2'>
                        <div>
                            <label className='text-xs'>Certification Name</label>
                            <Input className='w-full' value={item.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <div>
                            <label className='text-xs'>Issuer</label>
                            <Input className='w-full' value={item.issuer} onChange={(e) => handleChange(index, 'issuer', e.target.value)} />
                        </div>
                        <div>
                            <label className='text-xs'>Year</label>
                            <Input className='w-full' type='number' value={item.year} onChange={(e) => handleChange(index, 'year', e.target.value)} />
                        </div>
                        <div>
                            <label className='text-xs'>Certificate Link</label>
                            <Input className='w-full' value={item.link} onChange={(e) => handleChange(index, 'link', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={addNewCertification} className='text-primary'>+ Add More</Button>
                    <Button variant='outline' onClick={removeCertification} className='text-primary'>- Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Certificates;