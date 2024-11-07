import styled from 'styled-components';

const ServiceBanner = () => {
  return <ServiceBannerContainer>ServiceBanner</ServiceBannerContainer>;
};

export default ServiceBanner;

const ServiceBannerContainer = styled.div`
  height: 80px;
  border-radius: 10px;
  background: ${({ theme }) => theme.tokenColor['brand-default']};
`;
