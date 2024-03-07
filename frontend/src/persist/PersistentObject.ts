// Source code for the Substrate Telemetry Server.
// Copyright (C) 2023 Parity Technologies (UK) Ltd.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import { Persistent } from './';

export class PersistentObject<Data extends object> {
  private readonly inner: Persistent<Data>;

  constructor(key: string, initial: Data, onChange: (value: Data) => void) {
    this.inner = new Persistent(key, initial, onChange);
  }

  public raw(): Readonly<Data> {
    return this.inner.get();
  }

  public get<K extends keyof Data>(key: K): Data[K] {
    return this.inner.get()[key];
  }

  public set<K extends keyof Data>(key: K, value: Data[K]) {
    const data: Data = Object.assign({}, this.raw());
    data[key] = value;
    this.inner.set(data);
  }
}
