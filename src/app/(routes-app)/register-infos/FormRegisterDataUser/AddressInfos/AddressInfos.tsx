interface AddressInfosProps {
  neighborhood: string;
  ddd: string;
  locality: string;
  publicPlace: string;
  uf: string;
}

export default function AddressInfos({
  neighborhood,
  ddd,
  locality,
  publicPlace,
  uf,
}: AddressInfosProps): JSX.Element {
  return (
    <div className="h-[60%] pb-5 overflow-auto">
      <p className="font-secondary">
        <strong className="font-secondary">Bairro:</strong> {neighborhood}
      </p>
      <p className="font-secondary">
        <strong className="font-secondary">DDD:</strong> {ddd}
      </p>
      <p className="font-secondary">
        <strong className="font-secondary">Cidade:</strong> {locality}
      </p>
      <p className="font-secondary">
        <strong className="font-secondary">Rua:</strong> {publicPlace}
      </p>
      <p className="font-secondary">
        <strong className="font-secondary">Estado:</strong> {uf}
      </p>
    </div>
  );
}
